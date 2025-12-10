-- Initialize databases for Bizzer Network Stack

-- Create database for agents if it doesn't exist
CREATE DATABASE bizzer_agents;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE bizzer_agents TO bizzer;
