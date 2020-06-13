export interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'email@meudominio.com.br',
      name: 'Edgard do Meu Domínio',
    },
  },
} as IMailConfig;
