#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

sozo execute --profile $SCARB_PROFILE dojo_phaser-actions spawn --wait