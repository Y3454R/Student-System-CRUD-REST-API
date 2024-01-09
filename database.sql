CREATE TABLE IF NOT EXISTS public.students
(
    id integer NOT NULL DEFAULT nextval('students_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    age integer,
    dob date,
    CONSTRAINT students_pkey PRIMARY KEY (id)
)