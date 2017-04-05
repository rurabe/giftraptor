--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: giftraptor
--

COPY migrations (id, name, run_on) FROM stdin;
44	/20170218012706-create-timestamp-functions	2017-04-04 17:19:31.163
45	/20170218013027-create-users	2017-04-04 17:19:31.183
46	/20170218013032-create-gifts	2017-04-04 17:19:31.199
47	/20170218013038-create-subscriptions	2017-04-04 17:19:31.216
48	/20170304091232-add-trigram-index-to-users	2017-04-04 17:19:31.22
49	/20170309073142-add-deleted-at-to-gifts	2017-04-04 17:19:31.223
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: giftraptor
--

SELECT pg_catalog.setval('migrations_id_seq', 49, true);


--
-- PostgreSQL database dump complete
--

