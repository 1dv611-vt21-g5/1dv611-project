#!/bin/bash

trap "echo && echo Terminating && pkill inotifywait" SIGINT

inotifywait --exclude node_modules @./db @./sessions -m -r -e modify --format "%w%f changed: restarting..." . | sh &
node src/index
