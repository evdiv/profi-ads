import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import { sendPasswordResetEmail } from './libs/mail';

const sessionSecret = process.env.SESSION_SECRET ||
  'tftrPokijjugytgtfrt-ji86ggEcfvthh59ioh9u4ujPoolweews4353';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: `name admin occupation {id}`,
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: { admin: true }
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity); 
    },
  },
});

// This defines how long people will remain logged in for.
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
