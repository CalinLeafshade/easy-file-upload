# easy-file-upload

A simple service that allows you to upload files via a restricted API that returns a filename.

## Installation

EFU is designed to be self-hosted using docker.

An example docker-compose file is below:

```yaml
version: "3.4"
services:
  efu:
    image: calinleafshade/efu:0.2
    restart: unless-stopped
    environment:
      - KEY=YOURSECRETHERE
      - UPLOAD_DEST=/data
    volumes:
      - data:/data
volumes:
  data:
```

EFU listens on port 80.

##Configuration

EFU is configured using environment variables.

| Variable    | Description                                  |
| ---         | ---                                          |
| KEY         | Your secret key for uploading to the service |
| UPLOAD_DEST | The location where uploads will be saved     |

##Usage

Upload to the service using `curl` or something similar

```sh
curl -s -X POST -H "Authorization: Key YOURSECRETHERE" -F "file=@FILENAME" https://HOSTNAME/api/upload
```

This will return some json similar to:

```json
{
  "filename" : "HASHHERE.EXT"
}
```

The file can then be accessed at `https://HOSTNAME/HASHHERE.EXT`.

###Health check

There is also `/api/health` which just returns an empty `204` response to ensure the server is up.

