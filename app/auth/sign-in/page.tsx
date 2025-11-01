"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { FallbackImage } from '@/components/fallback-image';

export default function SignInPage() {
  const [email, setEmail] = useState('admin@ciser.com.br');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      toast.success('Login realizado com sucesso!');
      router.push('/app/captura');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
      toast.error('Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <FallbackImage 
            src="/brand/ciser-logo.png" 
            alt="CISER" 
            className="h-16 w-auto mx-auto mb-4"
            fallbackText="CISER"
            fallbackClassName="text-3xl font-bold text-primary mb-4"
          />
          <h1 className="text-2xl font-bold">CorroScan</h1>
          <p className="text-muted-foreground text-sm">
            Sistema de Detecção de Corrosão
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
                Entrar
              </Button>
            </form>

            {/* Demo credentials */}
            {/*<div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="text-sm font-medium mb-2">Credenciais de demonstração:</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Admin:</strong> admin@ciser.com.br / demo123</p>
                <p><strong>Inspetor:</strong> inspetor@ciser.com.br / demo123</p>
                <p><strong>Visualizador:</strong> viewer@ciser.com.br / demo123</p>
              </div>
            </div>*/}
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/auth/sign-up" className="text-primary hover:underline">
                  Criar conta
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>CISER - Parafusos e Porcas</p>
          <p>Tecnologia e qualidade desde 1959</p>
        </div>
      </div>
    </div>
  );
}