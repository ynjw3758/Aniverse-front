# Frontend Deployment Notes

## Target project

- `Aniverse_Front-dev`

## Current deployment blockers

- Production `.env` still points to private IPs like `192.168.56.102`
- Many components still call `localhost` directly instead of shared API constants
- WebSocket URLs are also hardcoded in several components

## Minimum deployment flow

1. Copy `.env.example` to `.env`
2. Fill production URLs with the cloud server public IP or domain
3. Replace remaining hardcoded `localhost` calls with shared API constants
4. Build and run with Docker:

```bash
docker build -t aniverse-front .
docker run -d -p 80:80 --name aniverse-front aniverse-front
```

## Immediate next work

- Convert remaining direct `localhost` API calls to environment-based URLs
- Set Kakao and Naver redirect URLs to the deployed frontend domain
- Optionally proxy API paths through Nginx after backend deployment is ready
