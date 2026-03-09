"use client";

import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import {
  getCurrentUser,
  hasSupabaseConfig,
  requestPasswordReset,
  signInWithPassword,
  signOutCurrentUser,
  signUpWithPassword,
  type AccountUser
} from "@/lib/auth/supabaseAuth";

type ViewMode = "login" | "signup" | "reset";

type AccountPanelProps = {
  locale: string;
};

type AccountCopy = {
  title: string;
  subtitle: string;
  login: string;
  signup: string;
  reset: string;
  logout: string;
  pleaseWait: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  createAccount: string;
  sendReset: string;
  loggedIn: string;
  loggedOut: string;
  resetSent: string;
  supabaseMissing: string;
  toolsStillOpen: string;
  savedConversions: string;
  apiAccess: string;
  billing: string;
  savedConversionsDesc: string;
  apiAccessDesc: string;
  billingDesc: string;
};

const accountCopyByLocale: Partial<Record<Locale, AccountCopy>> = {
  en: {
    title: "Account",
    subtitle: "Account is optional. All tools remain usable without login.",
    login: "Login",
    signup: "Create account",
    reset: "Reset password",
    logout: "Logout",
    pleaseWait: "Please wait...",
    email: "Email",
    username: "Username",
    password: "Password",
    createdAt: "Created at",
    createAccount: "Create account",
    sendReset: "Send reset email",
    loggedIn: "You are now logged in.",
    loggedOut: "You are now logged out.",
    resetSent: "Password reset email sent. Check your inbox.",
    supabaseMissing: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.",
    toolsStillOpen: "Tools remain fully accessible without account.",
    savedConversions: "Saved conversions",
    apiAccess: "API access",
    billing: "Billing",
    savedConversionsDesc: "Reserved for upcoming personal history and saved output snippets.",
    apiAccessDesc: "Reserved for future API keys, usage limits, and integration settings.",
    billingDesc: "Reserved for future freemium plans, invoices, and subscription details."
  },
  fr: {
    title: "Compte",
    subtitle: "Le compte est optionnel. Tous les outils restent accessibles sans connexion.",
    login: "Connexion",
    signup: "Creer un compte",
    reset: "Reinitialiser le mot de passe",
    logout: "Deconnexion",
    pleaseWait: "Veuillez patienter...",
    email: "Email",
    username: "Pseudo",
    password: "Mot de passe",
    createdAt: "Date de creation",
    createAccount: "Creer un compte",
    sendReset: "Envoyer l'email de reset",
    loggedIn: "Vous etes connecte.",
    loggedOut: "Vous etes deconnecte.",
    resetSent: "Email de reinitialisation envoye. Verifiez votre boite mail.",
    supabaseMissing: "Supabase n'est pas configure. Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans les variables d'environnement.",
    toolsStillOpen: "Les outils restent utilisables sans compte.",
    savedConversions: "Conversions sauvegardees",
    apiAccess: "Acces API",
    billing: "Facturation",
    savedConversionsDesc: "Reserve a l'historique personnel et aux extraits enregistres.",
    apiAccessDesc: "Reserve aux futures cles API, limites d'usage et parametres d'integration.",
    billingDesc: "Reserve aux futurs plans freemium, factures et abonnements."
  },
  es: {
    title: "Cuenta",
    subtitle: "La cuenta es opcional. Todas las herramientas funcionan sin iniciar sesion.",
    login: "Iniciar sesion",
    signup: "Crear cuenta",
    reset: "Restablecer contrasena",
    logout: "Cerrar sesion",
    pleaseWait: "Espera...",
    email: "Email",
    username: "Usuario",
    password: "Contrasena",
    createdAt: "Creado el",
    createAccount: "Crear cuenta",
    sendReset: "Enviar email de reset",
    loggedIn: "Sesion iniciada.",
    loggedOut: "Sesion cerrada.",
    resetSent: "Email de restablecimiento enviado. Revisa tu bandeja.",
    supabaseMissing: "Supabase no esta configurado. Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tus variables de entorno.",
    toolsStillOpen: "Las herramientas siguen disponibles sin cuenta.",
    savedConversions: "Conversiones guardadas",
    apiAccess: "Acceso API",
    billing: "Facturacion",
    savedConversionsDesc: "Reservado para historial personal y salidas guardadas.",
    apiAccessDesc: "Reservado para futuras claves API, limites y ajustes de integracion.",
    billingDesc: "Reservado para futuros planes freemium, facturas y suscripciones."
  },
  de: {
    title: "Konto",
    subtitle: "Ein Konto ist optional. Alle Tools bleiben ohne Login nutzbar.",
    login: "Anmelden",
    signup: "Konto erstellen",
    reset: "Passwort zurucksetzen",
    logout: "Abmelden",
    pleaseWait: "Bitte warten...",
    email: "E-Mail",
    username: "Benutzername",
    password: "Passwort",
    createdAt: "Erstellt am",
    createAccount: "Konto erstellen",
    sendReset: "Reset-E-Mail senden",
    loggedIn: "Du bist jetzt angemeldet.",
    loggedOut: "Du bist jetzt abgemeldet.",
    resetSent: "Reset-E-Mail gesendet. Bitte Posteingang prufen.",
    supabaseMissing: "Supabase ist nicht konfiguriert. Fuge NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY in die Umgebungsvariablen ein.",
    toolsStillOpen: "Die Tools bleiben ohne Konto voll nutzbar.",
    savedConversions: "Gespeicherte Konvertierungen",
    apiAccess: "API-Zugriff",
    billing: "Abrechnung",
    savedConversionsDesc: "Reserviert fur zukunftige Verlaufs- und Speicherfunktionen.",
    apiAccessDesc: "Reserviert fur zukunftige API-Schlussel und Integrationsoptionen.",
    billingDesc: "Reserviert fur zukunftige Freemium-Tarife und Rechnungen."
  },
  pt: {
    title: "Conta",
    subtitle: "A conta e opcional. Todas as ferramentas continuam disponiveis sem login.",
    login: "Entrar",
    signup: "Criar conta",
    reset: "Redefinir senha",
    logout: "Sair",
    pleaseWait: "Aguarde...",
    email: "Email",
    username: "Usuario",
    password: "Senha",
    createdAt: "Criado em",
    createAccount: "Criar conta",
    sendReset: "Enviar email de reset",
    loggedIn: "Voce entrou na conta.",
    loggedOut: "Voce saiu da conta.",
    resetSent: "Email de redefinicao enviado. Verifique sua caixa.",
    supabaseMissing: "Supabase nao esta configurado. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY nas variaveis de ambiente.",
    toolsStillOpen: "As ferramentas permanecem acessiveis sem conta.",
    savedConversions: "Conversoes salvas",
    apiAccess: "Acesso a API",
    billing: "Cobranca",
    savedConversionsDesc: "Reservado para historico pessoal e resultados salvos.",
    apiAccessDesc: "Reservado para futuras chaves de API e configuracoes de integracao.",
    billingDesc: "Reservado para futuros planos freemium e assinaturas."
  }
  ,
  zh: {
    title: "\u8d26\u6237",
    subtitle: "\u8d26\u6237\u662f\u53ef\u9009\u7684\u3002\u65e0\u9700\u767b\u5f55\u4e5f\u53ef\u4ee5\u4f7f\u7528\u6240\u6709\u5de5\u5177\u3002",
    login: "\u767b\u5f55",
    signup: "\u521b\u5efa\u8d26\u6237",
    reset: "\u91cd\u7f6e\u5bc6\u7801",
    logout: "\u9000\u51fa",
    pleaseWait: "\u8bf7\u7a0d\u5019...",
    email: "Email",
    username: "\u7528\u6237\u540d",
    password: "\u5bc6\u7801",
    createdAt: "\u521b\u5efa\u65f6\u95f4",
    createAccount: "\u521b\u5efa\u8d26\u6237",
    sendReset: "\u53d1\u9001\u91cd\u7f6e\u90ae\u4ef6",
    loggedIn: "\u60a8\u5df2\u6210\u529f\u767b\u5f55\u3002",
    loggedOut: "\u60a8\u5df2\u9000\u51fa\u767b\u5f55\u3002",
    resetSent: "\u5bc6\u7801\u91cd\u7f6e\u90ae\u4ef6\u5df2\u53d1\u9001\u3002",
    supabaseMissing:
      "Supabase \u672a\u914d\u7f6e\u3002\u8bf7\u5728\u73af\u5883\u53d8\u91cf\u4e2d\u6dfb\u52a0 NEXT_PUBLIC_SUPABASE_URL \u548c NEXT_PUBLIC_SUPABASE_ANON_KEY\u3002",
    toolsStillOpen: "\u65e0\u9700\u8d26\u6237\u4ecd\u53ef\u4f7f\u7528\u6240\u6709\u5de5\u5177\u3002",
    savedConversions: "\u5df2\u4fdd\u5b58\u7684\u8f6c\u6362",
    apiAccess: "API \u8bbf\u95ee",
    billing: "\u8ba1\u8d39",
    savedConversionsDesc: "\u7528\u4e8e\u672a\u6765\u7684\u4e2a\u4eba\u5386\u53f2\u8bb0\u5f55\u4e0e\u4fdd\u5b58\u8f93\u51fa\u529f\u80fd\u3002",
    apiAccessDesc: "\u7528\u4e8e\u672a\u6765\u7684 API \u5bc6\u94a5\u3001\u4f7f\u7528\u9650\u989d\u4e0e\u96c6\u6210\u8bbe\u7f6e\u3002",
    billingDesc: "\u7528\u4e8e\u672a\u6765\u7684\u514d\u8d39/\u4ed8\u8d39\u5957\u9910\u3001\u53d1\u7968\u4e0e\u8ba2\u9605\u8be6\u60c5\u3002"
  },
  ru: {
    title: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
    subtitle: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442 \u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u0435\u043d. \u0412\u0441\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b \u0431\u0435\u0437 \u0432\u0445\u043e\u0434\u0430.",
    login: "\u0412\u043e\u0439\u0442\u0438",
    signup: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442",
    reset: "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c",
    logout: "\u0412\u044b\u0439\u0442\u0438",
    pleaseWait: "\u041f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435...",
    email: "Email",
    username: "\u041f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c",
    password: "\u041f\u0430\u0440\u043e\u043b\u044c",
    createdAt: "\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f",
    createAccount: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442",
    sendReset: "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u0438\u0441\u044c\u043c\u043e \u0434\u043b\u044f \u0441\u0431\u0440\u043e\u0441\u0430",
    loggedIn: "\u0412\u044b \u0432\u043e\u0448\u043b\u0438 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442.",
    loggedOut: "\u0412\u044b \u0432\u044b\u0448\u043b\u0438 \u0438\u0437 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430.",
    resetSent: "\u041f\u0438\u0441\u044c\u043c\u043e \u0434\u043b\u044f \u0441\u0431\u0440\u043e\u0441\u0430 \u043f\u0430\u0440\u043e\u043b\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e.",
    supabaseMissing:
      "Supabase \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d. \u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 NEXT_PUBLIC_SUPABASE_URL \u0438 NEXT_PUBLIC_SUPABASE_ANON_KEY \u0432 \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0435 \u043e\u043a\u0440\u0443\u0436\u0435\u043d\u0438\u044f.",
    toolsStillOpen: "\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u043f\u043e-\u043f\u0440\u0435\u0436\u043d\u0435\u043c\u0443 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b \u0431\u0435\u0437 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430.",
    savedConversions: "\u0421\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0435 \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438",
    apiAccess: "API \u0434\u043e\u0441\u0442\u0443\u043f",
    billing: "\u0411\u0438\u043b\u043b\u0438\u043d\u0433",
    savedConversionsDesc: "\u0417\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u0434\u043b\u044f \u0431\u0443\u0434\u0443\u0449\u0435\u0439 \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0445 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432.",
    apiAccessDesc: "\u0417\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u0434\u043b\u044f \u0431\u0443\u0434\u0443\u0449\u0438\u0445 API-\u043a\u043b\u044e\u0447\u0435\u0439, \u043b\u0438\u043c\u0438\u0442\u043e\u0432 \u0438 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a.",
    billingDesc: "\u0417\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u0434\u043b\u044f \u0431\u0443\u0434\u0443\u0449\u0438\u0445 freemium-\u0442\u0430\u0440\u0438\u0444\u043e\u0432, \u0441\u0447\u0435\u0442\u043e\u0432 \u0438 \u043f\u043e\u0434\u043f\u0438\u0441\u043e\u043a."
  },
  ar: {
    title: "\u0627\u0644\u062d\u0633\u0627\u0628",
    subtitle: "\u0627\u0644\u062d\u0633\u0627\u0628 \u0627\u062e\u062a\u064a\u0627\u0631\u064a. \u062c\u0645\u064a\u0639 \u0627\u0644\u0623\u062f\u0648\u0627\u062a \u062a\u0639\u0645\u0644 \u0628\u062f\u0648\u0646 \u062a\u0633\u062c\u064a\u0644 \u062f\u062e\u0648\u0644.",
    login: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644",
    signup: "\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628",
    reset: "\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
    logout: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c",
    pleaseWait: "\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631...",
    email: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
    username: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",
    password: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
    createdAt: "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0625\u0646\u0634\u0627\u0621",
    createAccount: "\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628",
    sendReset: "\u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0639\u064a\u064a\u0646",
    loggedIn: "\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u062f\u062e\u0648\u0644\u0643 \u0628\u0646\u062c\u0627\u062d.",
    loggedOut: "\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u062e\u0631\u0648\u062c\u0643.",
    resetSent: "\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631.",
    supabaseMissing:
      "Supabase \u063a\u064a\u0631 \u0645\u064f\u0639\u062f\u0651 \u0628\u0639\u062f. \u0623\u0636\u0641 NEXT_PUBLIC_SUPABASE_URL \u0648 NEXT_PUBLIC_SUPABASE_ANON_KEY \u0641\u064a \u0645\u062a\u063a\u064a\u0631\u0627\u062a \u0627\u0644\u0628\u064a\u0626\u0629.",
    toolsStillOpen: "\u0627\u0644\u0623\u062f\u0648\u0627\u062a \u062a\u0628\u0642\u0649 \u0645\u062a\u0627\u062d\u0629 \u0628\u062f\u0648\u0646 \u062d\u0633\u0627\u0628.",
    savedConversions: "\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629",
    apiAccess: "\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 API",
    billing: "\u0627\u0644\u0641\u0648\u062a\u0631\u0629",
    savedConversionsDesc: "\u0645\u062d\u062c\u0648\u0632 \u0644\u0633\u062c\u0644 \u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629 \u0641\u064a \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644.",
    apiAccessDesc: "\u0645\u062d\u062c\u0648\u0632 \u0644\u0645\u0641\u0627\u062a\u064a\u062d API \u0648\u062d\u062f\u0648\u062f \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0648\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u062a\u0643\u0627\u0645\u0644.",
    billingDesc: "\u0645\u062d\u062c\u0648\u0632 \u0644\u062e\u0637\u0637 freemium \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a\u0629 \u0648\u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643\u0627\u062a."
  },
  hi: {
    title: "\u0906\u0915\u093e\u0909\u0902\u091f",
    subtitle: "\u0906\u0915\u093e\u0909\u0902\u091f \u0935\u0948\u0915\u0932\u094d\u092a\u093f\u0915 \u0939\u0948. \u0938\u092d\u0940 \u091f\u0942\u0932 \u092c\u093f\u0928\u093e \u0932\u0949\u0917\u0907\u0928 \u0915\u0947 \u092d\u0940 \u091a\u0932\u0924\u0947 \u0939\u0948\u0902.",
    login: "\u0932\u0949\u0917\u0907\u0928",
    signup: "\u0905\u0915\u093e\u0909\u0902\u091f \u092c\u0928\u093e\u090f\u0902",
    reset: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0930\u0940\u0938\u0947\u091f \u0915\u0930\u0947\u0902",
    logout: "\u0932\u0949\u0917\u0906\u0909\u091f",
    pleaseWait: "\u0915\u0943\u092a\u092f\u093e \u0907\u0902\u0924\u091c\u093e\u0930 \u0915\u0930\u0947\u0902...",
    email: "\u0908\u092e\u0947\u0932",
    username: "\u092f\u0942\u091c\u0930\u0928\u0947\u092e",
    password: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921",
    createdAt: "\u0916\u093e\u0924\u093e \u092c\u0928\u0928\u0947 \u0915\u0940 \u0924\u093e\u0930\u0940\u0916",
    createAccount: "\u0905\u0915\u093e\u0909\u0902\u091f \u092c\u0928\u093e\u090f\u0902",
    sendReset: "\u0930\u0940\u0938\u0947\u091f \u0908\u092e\u0947\u0932 \u092d\u0947\u091c\u0947\u0902",
    loggedIn: "\u0906\u092a \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u0932\u0949\u0917\u0907\u0928 \u0939\u094b \u0917\u090f \u0939\u0948\u0902\u0964",
    loggedOut: "\u0906\u092a \u0932\u0949\u0917\u0906\u0909\u091f \u0939\u094b \u0917\u090f \u0939\u0948\u0902\u0964",
    resetSent: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0930\u0940\u0938\u0947\u091f \u0908\u092e\u0947\u0932 \u092d\u0947\u091c \u0926\u0940 \u0917\u0908 \u0939\u0948\u0964",
    supabaseMissing:
      "Supabase \u0915\u0949\u0928\u094d\u092b\u093f\u0917\u0930 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 environment variables \u092e\u0947\u0902 NEXT_PUBLIC_SUPABASE_URL \u0914\u0930 NEXT_PUBLIC_SUPABASE_ANON_KEY \u091c\u094b\u095c\u0947\u0902\u0964",
    toolsStillOpen: "\u091f\u0942\u0932 \u092c\u093f\u0928\u093e \u0905\u0915\u093e\u0909\u0902\u091f \u0915\u0947 \u092d\u0940 \u092a\u0942\u0930\u0940 \u0924\u0930\u0939 \u0938\u0947 \u0909\u092a\u0932\u092c\u094d\u0927 \u0939\u0948\u0902\u0964",
    savedConversions: "\u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0915\u0928\u094d\u0935\u0930\u094d\u091c\u0928",
    apiAccess: "API \u090f\u0915\u094d\u0938\u0947\u0938",
    billing: "\u092c\u093f\u0932\u093f\u0902\u0917",
    savedConversionsDesc: "\u092d\u0935\u093f\u0937\u094d\u092f \u0915\u0947 \u0938\u0947\u0935 \u0939\u093f\u0938\u094d\u091f\u094d\u0930\u0940 \u0914\u0930 \u0915\u0928\u094d\u0935\u0930\u094d\u091c\u0928 \u0930\u093f\u0915\u0949\u0930\u094d\u0921 \u0915\u0947 \u0932\u093f\u090f \u0930\u093f\u091c\u0930\u094d\u0935\u094d\u0921\u0964",
    apiAccessDesc: "\u092d\u0935\u093f\u0937\u094d\u092f \u0915\u0947 API keys, usage limits \u0914\u0930 integration settings \u0915\u0947 \u0932\u093f\u090f \u0930\u093f\u091c\u0930\u094d\u0935\u094d\u0921\u0964",
    billingDesc: "\u092d\u0935\u093f\u0937\u094d\u092f \u0915\u0947 freemium plans \u0914\u0930 subscriptions \u0915\u0947 \u0932\u093f\u090f \u0930\u093f\u091c\u0930\u094d\u0935\u094d\u0921\u0964"
  }
};

function getAccountCopy(locale: string): AccountCopy {
  const fallback = accountCopyByLocale.en;

  if (!fallback) {
    throw new Error("Missing English account copy.");
  }

  if (isLocale(locale)) {
    return accountCopyByLocale[locale] ?? fallback;
  }

  return fallback;
}

export function AccountPanel({ locale }: AccountPanelProps) {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [mode, setMode] = useState<ViewMode>("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const supabaseReady = hasSupabaseConfig();
  const copy = useMemo(() => getAccountCopy(locale), [locale]);

  useEffect(() => {
    (async () => {
      const sessionUser = await getCurrentUser();
      setUser(sessionUser);
    })();
  }, []);

  function clearFeedback() {
    setMessage("");
    setError("");
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    clearFeedback();
    setIsLoading(true);

    try {
      await signInWithPassword(email, password);
      const sessionUser = await getCurrentUser();
      setUser(sessionUser);
      setPassword("");
      setMessage(copy.loggedIn);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to log in.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    clearFeedback();
    setIsLoading(true);

    try {
      const signupMessage = await signUpWithPassword(email, username, password);
      setMessage(signupMessage);
      const sessionUser = await getCurrentUser();
      setUser(sessionUser);
      setPassword("");
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : "Unable to create account.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReset(event: React.FormEvent) {
    event.preventDefault();
    clearFeedback();
    setIsLoading(true);

    try {
      await requestPasswordReset(email, locale);
      setMessage(copy.resetSent);
      setMode("login");
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    clearFeedback();
    setIsLoading(true);

    try {
      await signOutCurrentUser();
      setUser(null);
      setMode("login");
      setMessage(copy.loggedOut);
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : "Unable to log out.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!supabaseReady) {
    return (
      <section className="account-panel">
        <h1>{copy.title}</h1>
        <p className="error-banner">{copy.supabaseMissing}</p>
        <p className="account-subtitle">{copy.toolsStillOpen}</p>
      </section>
    );
  }

  if (user) {
    return (
      <section className="account-panel">
        <div className="account-header">
          <h1>{copy.title}</h1>
          <button type="button" className="button" onClick={() => void handleLogout()} disabled={isLoading}>
            {isLoading ? copy.pleaseWait : copy.logout}
          </button>
        </div>

        <div className="account-card">
          <p>
            <strong>{copy.email}:</strong> {user.email}
          </p>
          <p>
            <strong>{copy.username}:</strong> {user.username || "-"}
          </p>
          <p>
            <strong>{copy.createdAt}:</strong> {new Date(user.createdAt).toLocaleString(locale)}
          </p>
        </div>

        <div className="account-future-grid">
          <article className="account-future-card">
            <h2>{copy.savedConversions}</h2>
            <p>{copy.savedConversionsDesc}</p>
          </article>
          <article className="account-future-card">
            <h2>{copy.apiAccess}</h2>
            <p>{copy.apiAccessDesc}</p>
          </article>
          <article className="account-future-card">
            <h2>{copy.billing}</h2>
            <p>{copy.billingDesc}</p>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="account-panel">
      <h1>{copy.title}</h1>
      <p className="account-subtitle">{copy.subtitle}</p>

      <div className="account-tabs">
        <button type="button" className={mode === "login" ? "button" : "button ghost"} onClick={() => setMode("login")}>
          {copy.login}
        </button>
        <button type="button" className={mode === "signup" ? "button" : "button ghost"} onClick={() => setMode("signup")}>
          {copy.signup}
        </button>
        <button type="button" className={mode === "reset" ? "button" : "button ghost"} onClick={() => setMode("reset")}>
          {copy.reset}
        </button>
      </div>

      {message ? <p className="account-message">{message}</p> : null}
      {error ? <p className="error-banner">{error}</p> : null}

      {mode === "login" ? (
        <form className="account-form" onSubmit={(event) => void handleLogin(event)}>
          <label htmlFor="account-email-login">{copy.email}</label>
          <input id="account-email-login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="account-password-login">{copy.password}</label>
          <input
            id="account-password-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? copy.pleaseWait : copy.login}
          </button>
        </form>
      ) : null}

      {mode === "signup" ? (
        <form className="account-form" onSubmit={(event) => void handleSignup(event)}>
          <label htmlFor="account-email-signup">{copy.email}</label>
          <input id="account-email-signup" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="account-username-signup">{copy.username}</label>
          <input
            id="account-username-signup"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="account-password-signup">{copy.password}</label>
          <input
            id="account-password-signup"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? copy.pleaseWait : copy.createAccount}
          </button>
        </form>
      ) : null}

      {mode === "reset" ? (
        <form className="account-form" onSubmit={(event) => void handleReset(event)}>
          <label htmlFor="account-email-reset">{copy.email}</label>
          <input id="account-email-reset" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? copy.pleaseWait : copy.sendReset}
          </button>
        </form>
      ) : null}
    </section>
  );
}


