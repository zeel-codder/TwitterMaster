import express from "express";

declare global {
  namespace Express {
    interface Request {
      user_id?: Record<string,any>
      user_name?: Record<string,any>
    }
  }
}