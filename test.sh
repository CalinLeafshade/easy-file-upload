#!/bin/bash

filename=$(curl -H "Authorization: Key 12345" -F "file=@README.md" localhost:4000/api/upload | jq -r ".filename")

echo "Getting file"

curl "localhost:4000/$filename"
