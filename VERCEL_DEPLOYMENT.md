# Deploying HeyFood to Vercel

This guide explains how to deploy the HeyFood application (Next.js frontend and Express backend) to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [GitHub repository](https://github.com/new) containing your HeyFood code
3. [PostgreSQL database](https://neon.tech/) (or any other database service)

## Step 1: Prepare Your Code

Your code has been prepared for Vercel deployment with the following files:

- `client/vercel.json` - Configuration for the Next.js frontend
- `server/vercel.json` - Configuration for the Express backend
- Modified `server/src/index.ts` - Adapted for serverless environment
- Updated `server/package.json` - Added Vercel dependencies

## Step 2: Deploy the Backend API

1. **Log in to Vercel**:
   ```bash
   npx vercel login
   ```

2. **Navigate to the server directory**:
   ```bash
   cd server
   ```

3. **Deploy the API**:
   ```bash
   npx vercel
   ```
   
4. **Configure the deployment**:
   - When prompted, select:
     - Set up and deploy: `Y`
     - Link to existing project: `N`
     - Project name: `heyfood-api` (or your preferred name)
     - Directory: `./` (current directory)
     - Override settings: `N`

5. **Add environment variables in Vercel dashboard**:
   - Go to your project settings on Vercel
   - Add the following environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: The URL of your frontend deployment (will add later)

6. **Take note of your API URL**: It will look like `https://heyfood-api.vercel.app`

## Step 3: Deploy the Frontend

1. **Navigate to the client directory**:
   ```bash
   cd ../client
   ```

2. **Deploy the frontend**:
   ```bash
   npx vercel
   ```

3. **Configure the deployment**:
   - When prompted, select:
     - Set up and deploy: `Y`
     - Link to existing project: `N`
     - Project name: `heyfood` (or your preferred name)
     - Directory: `./` (current directory)
     - Override settings: `N`

4. **Add environment variables in Vercel dashboard**:
   - Go to your project settings on Vercel
   - Add the following environment variables:
     - `NEXT_PUBLIC_API_URL`: The URL of your API from Step 2

## Step 4: Connect Frontend and Backend

1. **Update the API CORS settings**:
   - Go to your API project settings on Vercel
   - Add the environment variable:
     - `FRONTEND_URL`: Your frontend URL (e.g., `https://heyfood.vercel.app`)

2. **Redeploy the API to apply changes**:
   - Go to your API project on Vercel
   - Trigger a new deployment by clicking "Redeploy"

## Step 5: Configure Custom Domains (Optional)

1. **Add custom domains in Vercel**:
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domains for both frontend and backend

## Step 6: Verify Deployment

1. **Test the frontend**:
   - Visit your frontend URL
   - Verify that the application loads properly
   - Test the functionality

2. **Test the API**:
   - Visit your API URL (e.g., `https://heyfood-api.vercel.app`)
   - You should see "HeyFood API is running"

## Troubleshooting

### API Connection Issues

- Check CORS settings in the backend
- Verify the `NEXT_PUBLIC_API_URL` is correct in the frontend
- Check network requests in browser developer tools

### Database Connection Issues

- Verify your database connection string is correct
- Ensure your database service allows connections from Vercel's IP ranges
- Check Vercel logs for connection errors

### Deployment Failures

- Check Vercel build logs for errors
- Ensure all dependencies are properly listed in package.json
- Verify that the Node.js version is compatible with Vercel

## Continuous Deployment

Vercel automatically deploys when you push changes to your GitHub repository. To update your application:

1. Push changes to your GitHub repository
2. Vercel will automatically trigger a new deployment
3. Monitor the deployment progress in the Vercel dashboard 