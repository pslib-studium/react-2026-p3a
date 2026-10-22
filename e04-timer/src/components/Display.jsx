export const Display = ({ count, ticks }) => (
  <div className="display">
    {/* změna key znovu spustí CSS animaci = bliknutí při každém tiku */}
    <span key={ticks} className="display__pulse" />
    <span className="display__count">{count}</span>
    <span className="display__ticks">tiků: {ticks}</span>
  </div>
)
