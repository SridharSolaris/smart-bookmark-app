-- Create bookmarks table
create table
  public.bookmarks (
    id bigint primary key generated always as identity,
    user_id uuid not null references auth.users (id) on delete cascade,
    title text not null,
    url text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
  ) tablespace pg_default;

-- Create index for faster queries
create index bookmarks_user_id_created_at_idx on public.bookmarks (
  user_id,
  created_at desc
) tablespace pg_default;

-- Enable RLS (Row Level Security)
alter table public.bookmarks enable row level security;

-- Create policy: Users can only see their own bookmarks
create policy "Users can view their own bookmarks" on public.bookmarks
  for select using (auth.uid () = user_id);

-- Create policy: Users can insert only their own bookmarks
create policy "Users can insert their own bookmarks" on public.bookmarks
  for insert with check (auth.uid () = user_id);

-- Create policy: Users can delete their own bookmarks
create policy "Users can delete their own bookmarks" on public.bookmarks
  for delete using (auth.uid () = user_id);

-- Create policy: Users can update their own bookmarks
create policy "Users can update their own bookmarks" on public.bookmarks
  for update using (auth.uid () = user_id)
  with check (auth.uid () = user_id);
