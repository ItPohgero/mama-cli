/**
 * @author <%= author %>
 * @generated at <%= createdAt %>
 * This file is generated by Mama CLI
 */

import { HonoClient } from "@/server/configs/hono.client";
import type LoginSchema from "@/server/schema/auth/login.schema";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { type ErrorResponse, OnError } from "./asert_error";

const mutationFn = async (data: z.infer<typeof LoginSchema>) => {
	try {
		const client = await HonoClient();
		const r = await client.api.v1.auth.login.$post({
			json: data,
		});
		if (!r.ok) {
			const err: ErrorResponse = await r.json();
			const error = OnError(err);
			throw new Error(`Ups : ${error}`);
		}
		const resp = await r.json();
		return resp;
	} catch (error) {
		const er = error instanceof Error ? error.message : String(error);
		throw new Error(er);
	}
};

const Call<%= name %> = () => {
	return useMutation({
		mutationKey: [<%= name %>],
		mutationFn,
	});
};

export default Call<%= name %>;

