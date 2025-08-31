#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

// Configuration
const DOCKER_IMAGE = "tunes-website";
const CONTAINER_NAME = "tunes-website";
const PORT = "8088";

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: true,
      ...options,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

async function checkDocker() {
  try {
    await runCommand("docker", ["--version"], { stdio: "ignore" });

    // Also check if Docker daemon is running
    await runCommand("docker", ["info"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function stopExistingContainer() {
  try {
    log("🛑 Stopping existing container...", "yellow");
    await runCommand("docker", ["stop", CONTAINER_NAME], { stdio: "ignore" });
    await runCommand("docker", ["rm", CONTAINER_NAME], { stdio: "ignore" });
  } catch {
    // Container doesn't exist or already stopped
  }
}

async function buildImage() {
  log("📦 Building Docker image...", "yellow");
  await runCommand("docker", [
    "build",
    "-t",
    DOCKER_IMAGE,
    "-f",
    "docker/Dockerfile",
    ".",
  ]);
}

async function runContainer() {
  log("🐳 Starting new container...", "yellow");
  await runCommand("docker", [
    "run",
    "-d",
    "--name",
    CONTAINER_NAME,
    "-p",
    `${PORT}:80`,
    "--restart",
    "unless-stopped",
    DOCKER_IMAGE,
  ]);
}

async function waitForContainer() {
  log("⏳ Waiting for container to start...", "yellow");

  // Wait a bit for container to initialize
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

async function checkContainerStatus() {
  try {
    const { spawn } = require("child_process");

    return new Promise((resolve) => {
      const child = spawn(
        "docker",
        ["ps", "--filter", `name=${CONTAINER_NAME}`, "--format", "{{.Names}}"],
        {
          shell: true,
        }
      );

      let output = "";
      child.stdout.on("data", (data) => {
        output += data.toString();
      });

      child.on("close", () => {
        resolve(output.trim() === CONTAINER_NAME);
      });
    });
  } catch {
    return false;
  }
}

async function showLogs() {
  log("📋 Container logs:", "yellow");
  try {
    await runCommand("docker", ["logs", CONTAINER_NAME, "--tail", "20"]);
  } catch {
    // Ignore if logs can't be shown
  }
}

async function deploy() {
  try {
    log("🚀 Starting Tunes Website deployment...", "blue");

    // Check if Docker is available
    if (!(await checkDocker())) {
      log("❌ Docker is not available!", "red");
      log(
        "Please make sure Docker Desktop is installed and running:",
        "yellow"
      );
      log(
        "  1. Install Docker Desktop from https://docker.com/products/docker-desktop",
        "yellow"
      );
      log("  2. Start Docker Desktop application", "yellow");
      log(
        "  3. Wait for Docker to finish starting (whale icon in system tray)",
        "yellow"
      );
      log("  4. Run this command again", "yellow");
      process.exit(1);
    }

    // Stop existing container
    await stopExistingContainer();

    // Build new image
    await buildImage();

    // Run new container
    await runContainer();

    // Wait for container to start
    await waitForContainer();

    // Check if container is running
    const isRunning = await checkContainerStatus();

    if (isRunning) {
      log("✅ Deployment successful!", "green");
      log(`🌐 Application is running at http://localhost:${PORT}`, "green");

      // Show recent logs
      await showLogs();
    } else {
      log("❌ Deployment failed!", "red");
      log("📋 Container logs:", "yellow");
      await showLogs();
      process.exit(1);
    }
  } catch (error) {
    log(`❌ Deployment failed: ${error.message}`, "red");
    process.exit(1);
  }
}

// Run deployment
deploy();
