import { config } from '@keystone-6/core'
import { lists } from './schema'
import { withAuth, session } from './auth'
import { isAdmin } from './access'

const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:rt61278@localhost:5432/profi'

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      	provider: 'postgresql',
        url: databaseURL,
      	enableLogging: true,
      	useMigrations: true,
      	idField: { kind: 'autoincrement'}
    },
    // Allow AdminUI only for admins
    ui: {
		  isAccessAllowed: isAdmin
    },
	  server: {
		  cors: {
			  origin: [process.env.FRONTEND_URL || 'http://localhost:3001'],
			  credentials: true,
		  },
	  },
    lists,
    session,
  	})
)
