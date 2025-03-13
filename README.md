# round-robin-coupon-distribution-web-app

This application distributes coupons in a round-robin manner with abuse prevention.

## Setup Instructions

1.  **Backend:**
    * Navigate to the `server` directory.
    * Run `pnpm install`.
    * Run `npx tsc` to compile the TypeScript code.
    * Deploy the `dist` folder to a Node.js hosting service.
2.  **Frontend:**
    * Navigate to the project root.
    * Run `pnpm install`.
    * Update the `axios` base URL in `page.tsx` to the deployed backend URL.
    * Run `pnpm run build` to create a production build.
    * Deploy the `out` folder (or use a Next.js hosting service like Vercel).

## Abuse Prevention Strategies

* **IP Tracking:** The backend records the IP address of each user who claims a coupon. Subsequent claims from the same IP are blocked for one hour.
* **Cookie Tracking:** A cookie is used to identify browser sessions. This helps prevent simple refresh-based abuse.

## Live URL

https://round-robin-coupon-distribution-web-app.vercel.app/

## Testing

Access the live URL in a browser. Claim a coupon. Try claiming another coupon within one hour from the same IP. Observe the error message. Try claiming with a different ip address.
