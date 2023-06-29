-- Table: public.Users

DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    login text COLLATE pg_catalog."default" NOT NULL,
    id bigint,
    name text COLLATE pg_catalog."default",
    public_repos bigint,
    followers bigint,
    following bigint,
    company text COLLATE pg_catalog."default",
    node_id text COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    CONSTRAINT "Users_pkey" PRIMARY KEY (login)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;
	
	
-- Table: public.programminglanguage

DROP TABLE IF EXISTS public.programminglanguage;

CREATE TABLE IF NOT EXISTS public.programminglanguage
(
    langid text COLLATE pg_catalog."default",
    login text COLLATE pg_catalog."default",
    expinmonths integer,
    CONSTRAINT fk_customer FOREIGN KEY (login)
        REFERENCES public."Users" (login) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.programminglanguage
    OWNER to postgres;