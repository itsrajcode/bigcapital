import { knexSnakeCaseMappers } from 'objection';
import { systemKnexConfig } from '@/config/knexConfig';

export default () => {
  // Use require to avoid TypeScript import issues
  const knex = require('knex');
  return knex({
    ...systemKnexConfig,
    ...knexSnakeCaseMappers({ upperCase: true }),
  });
};