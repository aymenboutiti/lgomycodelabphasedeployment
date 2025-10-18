'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Header from '../../components/header/page';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    if (!role) {
      setStatus({ type: 'error', message: 'Veuillez choisir votre rôle.' });
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password, role);
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Connexion réussie. Redirection en cours...' });
        const targetPath = role === 'professeur' ? '/teachers' : '/students';
        setTimeout(() => router.push(targetPath), 1000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Email ou mot de passe incorrect.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Une erreur est survenue lors de la connexion.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <Header 
          title="Se connecter" 
          subtitle="Accédez à votre espace personnel"
          showBackButton={true}
        />

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Vous êtes</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className={`flex-1 cursor-pointer border rounded-lg p-4 transition ${role === 'eleve' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="role" value="eleve" className="sr-only" checked={role === 'eleve'} onChange={() => setRole('eleve')} />
              <div className="flex items-center gap-3">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-blue-600 text-white">E</span>
                <div>
                  <div className="font-semibold text-gray-900">Élève</div>
                  <div className="text-sm text-gray-600">Se connecter à l'espace élève</div>
                </div>
              </div>
            </label>
            <label className={`flex-1 cursor-pointer border rounded-lg p-4 transition ${role === 'professeur' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="role" value="professeur" className="sr-only" checked={role === 'professeur'} onChange={() => setRole('professeur')} />
              <div className="flex items-center gap-3">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-blue-600 text-white">P</span>
                <div>
                  <div className="font-semibold text-gray-900">Professeur</div>
                  <div className="text-sm text-gray-600">Se connecter à l'espace enseignant</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {status.message && (
            <div className={`rounded-lg border p-4 flex items-start gap-3 ${status.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
              <svg className={`h-5 w-5 mt-0.5 ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                {status.type === 'success' ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.153-.094l4.984-6.494z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm-.75-4.25a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5Zm0-6.5a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4z" clipRule="evenodd" />
                )}
              </svg>
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Mot de passe</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
          </div>

          <div className="pt-2 flex justify-between items-center gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <div className="text-sm text-gray-600">
              <span>Pas de compte ? </span>
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">S'inscrire</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
