/**
 * @file RegisterPage.tsx
 * @description صفحة إنشاء الحساب — وضع ليلي، تصميم عربي أولاً.
 *              Dark mode Arabic-first registration page with glassmorphism card.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from './AuthContext';

/** مخطط التحقق من بيانات التسجيل */
const registerSchema = z
  .object({
    email: z.string().email('البريد الإلكتروني غير صالح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

/** صفحة إنشاء حساب جديد */
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await api.post('/auth/register', { email: data.email, password: data.password });
      const loginRes = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      const { access_token, refresh_token, user } = loginRes.data;
      login(access_token, refresh_token, user);
      navigate(redirect, { replace: true });
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorMsg('هذا البريد الإلكتروني مسجّل مسبقاً.');
      } else {
        setErrorMsg(err.response?.data?.message ?? 'فشل إنشاء الحساب. حاول مجدداً.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.08)',
    border: hasError ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    fontSize: 'var(--text-sm)',
    outline: 'none',
    boxSizing: 'border-box' as const,
  });

  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4"
      style={{ backgroundColor: 'var(--color-black)' }}
    >
      {/* بطاقة زجاجية */}
      <div
        className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* العنوان */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-heading" style={{ color: 'var(--color-gold)' }}>
            إنشاء حساب جديد
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>
            انضم إلى وسم وابدأ تخصيص ثوبك
          </p>
        </div>

        {/* رسالة خطأ */}
        {errorMsg && (
          <div
            className="p-3 rounded-lg text-sm"
            style={{
              background: 'rgba(185,28,28,0.2)',
              border: '1px solid rgba(185,28,28,0.4)',
              color: '#fca5a5',
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* النموذج */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" dir="rtl">
          {/* البريد الإلكتروني */}
          <div className="space-y-1">
            <label className="block text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="example@email.com"
              style={inputStyle(!!errors.email)}
            />
            {errors.email && (
              <p style={{ color: '#f87171', fontSize: 'var(--text-xs)' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* كلمة المرور */}
          <div className="space-y-1">
            <label className="block text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              كلمة المرور
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              style={inputStyle(!!errors.password)}
            />
            {errors.password && (
              <p style={{ color: '#f87171', fontSize: 'var(--text-xs)' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="space-y-1">
            <label className="block text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="••••••••"
              style={inputStyle(!!errors.confirmPassword)}
            />
            {errors.confirmPassword && (
              <p style={{ color: '#f87171', fontSize: 'var(--text-xs)' }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* زر الإنشاء */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold bg-gold-gradient text-black hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            إنشاء الحساب
          </button>
        </form>

        {/* رابط الدخول */}
        <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
          لديك حساب بالفعل؟{' '}
          <Link
            to={`/login?redirect=${encodeURIComponent(redirect)}`}
            style={{ color: 'var(--color-gold)' }}
            className="hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
