# Closet App Backend

A Node.js backend service for analyzing clothing colors using OpenAI's GPT-4 Vision API.

## Features

- 🎨 Color analysis using GPT-4 Vision
- 📸 Support for both base64 and file uploads
- 🔒 Secure API key handling
- 🛡️ Rate limiting and security middleware
- 📊 Health monitoring
- 🚀 Production-ready setup

## Quick Start

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file and add your OpenAI API key:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=your_actual_api_key_here
```

### 3. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and uptime.

### Color Analysis (Base64)
```
POST /api/color-analysis/analyze-base64
Content-Type: application/json

{
  "image": "base64_encoded_image_data",
  "mimeType": "image/jpeg"
}
```

### Color Analysis (File Upload)
```
POST /api/color-analysis/analyze-file
Content-Type: multipart/form-data

Form data:
- image: image file
```

### Test Endpoint
```
GET /api/color-analysis/test
```
Returns API information and available endpoints.

## Response Format

```json
{
  "primary": "#FF0000",
  "secondary": "#0000FF",
  "tertiary": "#00FF00",
  "quaternary": null,
  "percentages": {
    "#FF0000": 45,
    "#0000FF": 35,
    "#00FF00": 20
  },
  "description": "Red shirt with blue and green accents",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "model": "gpt-4o"
}
```

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- CORS protection
- Helmet security headers
- File size limits (10MB)
- Input validation
- Error handling

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Allowed CORS origin | http://localhost:8081 |

## Error Handling

The API returns structured error responses:

```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

Common error codes:
- `400`: Bad request (missing/invalid data)
- `413`: File too large
- `429`: Rate limit exceeded
- `500`: Internal server error

## Deployment

### Using PM2 (Recommended)

```bash
npm install -g pm2
pm2 start server.js --name "closet-backend"
pm2 startup
pm2 save
```

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Setup for Production

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper `FRONTEND_URL`
4. Set up SSL/HTTPS
5. Configure reverse proxy (nginx)

## Monitoring

The `/health` endpoint provides:
- Server status
- Uptime
- Timestamp

Use this for health checks in production environments.

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Verify your API key is correct
   - Check if you have sufficient credits
   - Ensure the key has GPT-4 Vision access

2. **CORS Issues**
   - Update `FRONTEND_URL` in `.env`
   - Check if your frontend URL matches exactly

3. **File Upload Issues**
   - Ensure images are under 10MB
   - Check file format (JPEG, PNG, etc.)

4. **Rate Limiting**
   - Default: 100 requests per 15 minutes
   - Adjust in `server.js` if needed

### Logs

Enable detailed logging in development:
```bash
DEBUG=* npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.