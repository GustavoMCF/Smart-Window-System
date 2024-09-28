import { Request, Response, NextFunction } from 'express';

export function cachearResultado(duration: number) {
  let cache: any = null;
  let timestamp = Date.now();

  return (req: Request, res: Response, next: NextFunction): void => {
    if (cache && (Date.now() - timestamp < duration)) {
      res.send(cache); // Envia a resposta cacheada
    } else {
      // Armazena a função original de 'send'
      const originalSend = res.send.bind(res);

      // Substitui a função 'send' para cachear a resposta
      res.send = (body: any): Response => {
        cache = body; // Armazena a resposta no cache
        timestamp = Date.now(); // Atualiza o timestamp
        return originalSend(body); // Chama a função original
      };

      next(); // Continua para o próximo middleware ou rota
    }
  };
}
