import { Request, Response } from 'express';
import { AppDataSource } from '../../../infra/database';
import { env } from '../../../config/env';

export class HealthController {
  public async health(req: Request, res: Response): Promise<void> {
    const start = performance.now();

    try {
      await AppDataSource.query('SELECT 1');
      const latency = performance.now() - start;

      const [{ max_connections }] = await AppDataSource.query('SHOW max_connections');

      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
        uptime_seconds: parseFloat(process.uptime().toFixed(2)),
        database: {
          status: 'connected',
          latency_ms: parseFloat(latency.toFixed(4)),
          max_connections: parseInt(max_connections, 10),
        },
      });
    } catch (error) {
      console.error('[HealthController]', error);

      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
        uptime_seconds: parseFloat(process.uptime().toFixed(2)),
        database: {
          status: 'disconnected',
        },
      });
    }
  }
}
