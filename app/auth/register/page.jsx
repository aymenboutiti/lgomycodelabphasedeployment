'use client';

import React, { useMemo, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '../../components/header/page';

const baseLevels = [
  { value: 'base', label: "Enseignement de base" },
  { value: 'secondaire', label: "Enseignement secondaire" },
];

const baseClassesByLevel = {
  base: [
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
  ],
  secondaire: [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ],
};

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('base');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    ville: '',
    classe: '',
    matiere: '',
    password: '',
  });

  const availableClasses = useMemo(() => baseClassesByLevel[level] ?? [], [level]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    // Basic validations
    if (!formData.password || formData.password.length < 6) {
      setStatus({ type: 'error', message: 'Le mot de passe doit contenir au moins 6 caractères.' });
      setLoading(false);
      return;
    }

    if (formData.password !== (formData.confirmPassword || '')) {
      setStatus({ type: 'error', message: 'La confirmation du mot de passe ne correspond pas.' });
      setLoading(false);
      return;
    }

    const payload = {
      role,
      level,
      ...formData,
    };

    try {
      const result = await register(payload);
      
      if (result.success) {
        setStatus({ type: 'success', message: "Inscription réussie. Redirection en cours..." });
        setFormData({ nom: '', prenom: '', email: '', telephone: '', ville: '', classe: '', matiere: '', password: '', confirmPassword: '' });
        
        // Redirect to appropriate page
        const targetPath = role === 'professeur' ? '/teachers' : '/students';
        setTimeout(() => router.push(targetPath), 1000);
      } else {
        setStatus({ type: 'error', message: result.error || "Une erreur est survenue lors de l'inscription." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: "Une erreur est survenue lors de l'inscription." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Header 
          title="Créer un compte" 
          subtitle="Rejoignez notre communauté éducative"
          showBackButton={true}
        />

        

        {/* Choix du rôle */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Vous êtes</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className={`flex-1 cursor-pointer border rounded-lg p-4 transition ${role === 'eleve' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                name="role"
                value="eleve"
                className="sr-only"
                checked={role === 'eleve'}
                onChange={() => setRole('eleve')}
              />
              <div className="flex items-center gap-3">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-blue-600 text-white">E</span>
                <div>
                  <div className="font-semibold text-gray-900">Élève</div>
                  <div className="text-sm text-gray-600">Je souhaite m'inscrire comme élève</div>
                </div>
              </div>
            </label>
            <label className={`flex-1 cursor-pointer border rounded-lg p-4 transition ${role === 'professeur' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                name="role"
                value="professeur"
                className="sr-only"
                checked={role === 'professeur'}
                onChange={() => setRole('professeur')}
              />
              <div className="flex items-center gap-3">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-blue-600 text-white">P</span>
                <div>
                  <div className="font-semibold text-gray-900">Professeur</div>
                  <div className="text-sm text-gray-600">Je souhaite m'inscrire comme professeur</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Afficher un seul formulaire après le choix du rôle */}
        {role && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nom">Nom</label>
              <input id="nom" name="nom" type="text" required value={formData.nom} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="prenom">Prénom</label>
              <input id="prenom" name="prenom" type="text" required value={formData.prenom} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telephone">Numéro de téléphone</label>
              <input id="telephone" name="telephone" type="tel" required value={formData.telephone} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ville">Ville</label>
              <input id="ville" name="ville" type="text" required value={formData.ville} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Mot de passe</label>
              <input id="password" name="password" type="password" required value={formData.password} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" />
            </div>
            {/* Si élève: afficher niveau + classe; si professeur: afficher matière */}
            {role === 'eleve' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="level">Niveau scolaire</label>
                  <select id="level" value={level} onChange={(e) => { setLevel(e.target.value); setFormData((p)=>({...p, classe: ''})); }} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600">
                    {baseLevels.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="classe">Classe</label>
                  <select id="classe" name="classe" required value={formData.classe} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600">
                    <option value="" disabled>Choisir une classe</option>
                    {availableClasses.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="matiere">Matière enseignée</label>
                <input id="matiere" name="matiere" type="text" required value={formData.matiere} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600" placeholder="Ex: Mathématiques" />
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </div>
        </form>
        )}

        {status.message && (
          <div className={`mt-8 rounded-lg border p-4 flex items-start gap-3 ${status.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
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
      </div>
    </section>
  );
}


