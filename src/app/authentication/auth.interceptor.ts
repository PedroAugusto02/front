import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtém o token do localStorage
  const authToken = localStorage.getItem('authToken');
  
  // Log para verificar o token
  console.log('Auth Token:', authToken);

  // Clona a requisição e adiciona o cabeçalho de autorização se o token estiver presente
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Envia a requisição clonada
    return next(authReq);
  }

  // Se não houver token, apenas envia a requisição original
  return next(req);
};
