// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nProvider } from "@refinedev/core";

i18n.use(initReactI18next).init({
    lng: "pt",
    fallbackLng: "pt",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        pt: {
            translation: {
                auth: {
                    signin: {
                        title: "Iniciar sessão",
                        username: "Email",
                        password: "Palavra-passe",
                        rememberMe: "Lembrar-me",
                        forgotPassword: "Esqueceu a palavra-passe?",
                        submit: "Entrar",
                        signIn: "Entrar",
                        noAccount: "Ainda não tens conta?",
                        signUpLink: "Registar",
                    },
                    register: {
                        title: "Criar conta",
                        register: "Registar",
                        alreadyHaveAccount: "Já tens conta?",
                        signIn: "Entrar",
                    },
                },
                actions: {
                    edit: "Editar",
                    create: "Criar",
                    save: "Guardar",
                    cancel: "Cancelar",
                    delete: "Eliminar",
                    show: "Visualizar",
                    list: "Listar",
                },
                buttons: {
                    create: "Criar",
                    save: "Guardar",
                    cancel: "Cancelar",
                    delete: "Eliminar",
                    show: "Detalhes",
                    confirm: "Tem a certeza?",
                },
                titles: {
                    create: "Criar",
                    edit: "Editar",
                    show: "Detalhes",
                },
                pages: {
                    error: {
                        notFound: "Página não encontrada",
                    },
                    login: {
                        title: "Inicia sessão na tua conta",
                        fields: {
                            email: "Email",
                            password: "Palavra-passe",
                        },
                        buttons: {
                            rememberMe: "Lembrar-me",
                            forgotPassword: "Esqueceste-te da palavra-passe?",
                            noAccount: "Ainda não tens conta?",
                            signup: "Registar",
                        },
                        signin: "Entrar",
                        errors: {
                            requiredEmail: "O email é obrigatório",
                            requiredPassword: "A palavra-passe é obrigatória",
                        },
                        divider: "ou",
                    },
                    forgotPassword: {
                        title: "Esqueceste palavra-passe?",
                        fields: {
                            email: "Email",
                        },
                        buttons: {
                            submit: "Enviar instruções para repor",
                            haveAccount: "Já tens conta?",
                        },
                        signin: "Entrar",
                        errors: {
                            requiredEmail: "O email é obrigatório",
                            validEmail: "Email inválido",
                        },
                    }
                },
                notifications: {
                    success: "Sucesso!",
                    error: "Erro!",
                    confirmation: "Tem a certeza?",
                    required: "Este campo é obrigatório.",
                },
            },
        },
    },
});

export const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any, defaultMessage?: string) => {
        const translation = i18n.t(key, options);
        if (typeof translation === "string") {
            if (translation === key && defaultMessage) {
                return defaultMessage;
            }
            return translation;
        }
        // Se não for string, converte para string (ex: array ou object)
        return String(translation) || defaultMessage || key;
    },
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
};

export default i18n;
