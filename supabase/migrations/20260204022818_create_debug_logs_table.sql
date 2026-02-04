-- Purpose: Create debug_logs table to store debug messages
-- Created at: 2026-02-04 02:28:18 UTC
-- Author: Sammy Kori

create table if not exists debug_logs (
  id bigserial primary key,
  msg text,
  created_at timestamptz default now()
);
