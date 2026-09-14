// Express 4 doesn't forward rejected promises to the error middleware on
// its own — without this, a failed `await pool.query(...)` inside a route
// would just hang the request instead of returning a 500.
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
