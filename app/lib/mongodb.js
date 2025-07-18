// This file is maintained for backward compatibility
// It re-exports the database connection from the config directory
import { connectDB } from '../config/db';

export { connectDB };