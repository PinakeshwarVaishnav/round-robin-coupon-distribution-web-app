import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Adjust origin in production
app.use(express.json());
app.use(cookieParser());

const coupons = ["COUPON10", "COUPON20", "COUPON30", "COUPON40", "COUPON50"];
let couponIndex = 0;
const claimedIps: { [ip: string]: number } = {};
const claimCooldown = 3600000; // 1 hour in milliseconds

app.post("/api/claim", (req: Request, res: Response): any => {
  const ip = req.ip;
  const cookieId = req.cookies.cookieId;
  console.log("the value of ip is", ip);
  console.log("cookie id is", cookieId);
  console.log('claimedIps value is', claimedIps)

  if (ip && claimedIps[ip] && Date.now() - claimedIps[ip] < claimCooldown) {
    return res.status(429).json({
      message: `Please wait ${Math.ceil((claimCooldown - (Date.now() - claimedIps[ip])) / 1000 / 60)} minutes before claiming again.`,
    });
  }

  if (!cookieId) {
    res.cookie("cookieId", Math.random().toString(36).substring(2), {
      httpOnly: true,
    });
  }

  const coupon = coupons[couponIndex % coupons.length];
  couponIndex++;

  if (ip) {
    claimedIps[ip] = Date.now();
  }
  res.json({ coupon });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
