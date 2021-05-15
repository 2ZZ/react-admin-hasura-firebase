/* Create secrets app tables */

CREATE TABLE public.secrets (
id bigserial not null primary key,
title text,
username text null,
password text null,
previous_password text null,
api_key text null,
notes text null,
created_at timestamp with time zone not null default now(),
user_id text not null references public.users(id)
);
INSERT INTO public.secrets(title, username, password, notes, user_id)
SELECT 'example.com' as title,
       'username@example.com' as username,
       'password1' as password,
       'example note' as notes,
       'ituqUpWUIAX3CN6cNivzNSsqlt82' as user_id;

GRANT SELECT, INSERT ON public.secrets TO hasurauser;
GRANT USAGE, SELECT ON SEQUENCE public.todos_id_seq TO hasurauser;