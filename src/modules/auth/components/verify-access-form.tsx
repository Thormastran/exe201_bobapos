"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { authApi } from "@/modules/auth/api/auth.api";
import { setAuthSession } from "@/modules/auth/lib/auth-session";
import { verifyAccessSchema } from "@/modules/auth/schemas/auth.schema";
import { useAuthStore } from "@/modules/auth/stores/auth.store";

type VerifyAccessFormValues = z.infer<typeof verifyAccessSchema>;

export function VerifyAccessForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const form = useForm<VerifyAccessFormValues>({
    resolver: zodResolver(verifyAccessSchema),
    defaultValues: { code: "" }
  });
  const verify = useMutation({
    mutationFn: authApi.verifyAccess,
    onSuccess: (data) => {
      setAuthSession(data);
      setUser(data.user);
      router.push("/dashboard");
    }
  });

  return (
    <div className="w-full max-w-[430px]">
      <div className="mb-6 flex justify-center">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-white shadow-sm">
            <Image src="/Layer_1.svg" alt="" width={25} height={31} className="h-6 w-5" priority />
          </span>
          <span className="text-lg font-extrabold text-primary">BobaPos</span>
        </div>
      </div>

      <form
        className="rounded-lg bg-white px-8 py-10 text-center shadow-[0_24px_70px_rgba(28,52,93,0.10)]"
        onSubmit={form.handleSubmit((values) => verify.mutate(values))}
      >
        <div>
          <h2 className="text-2xl font-extrabold leading-tight tracking-normal text-[#111d2f]">Khôi phục quyền truy cập</h2>
          <p className="mx-auto mt-5 max-w-[330px] text-sm leading-5 text-[#555c6b]">
            Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến email của bạn. Vui lòng nhập mã bên dưới để tiếp tục.
          </p>
        </div>

        <div className="mt-10">
          <label htmlFor="code" className="sr-only">
            Mã xác thực
          </label>
          <input
            id="code"
            inputMode="numeric"
            maxLength={8}
            placeholder="••••••"
            className="h-14 w-full border-0 border-b-2 border-[#c7cbd7] bg-transparent px-3 text-center text-2xl font-bold tracking-[1rem] text-[#111d2f] outline-none placeholder:text-[#7a8293] focus:border-primary"
            {...form.register("code")}
          />
          {form.formState.errors.code ? (
            <p className="mt-2 text-xs font-medium text-destructive">{form.formState.errors.code.message}</p>
          ) : null}
        </div>

        <Button className="mt-8 h-14 w-full rounded bg-primary text-sm font-bold shadow-sm" disabled={verify.isPending}>
          Xác thực
          <ArrowRight className="h-4 w-4" />
        </Button>
        <button
          type="button"
          className="mt-3 flex h-12 w-full items-center justify-center gap-3 rounded border border-primary bg-white text-sm font-semibold text-primary hover:bg-primary/5"
        >
          <RotateCcw className="h-4 w-4" />
          Gửi lại mã
        </button>

        <div className="mt-8 border-t border-[#eef1f6] pt-7">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4f5564] hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang đăng nhập
          </Link>
        </div>
      </form>

      <div className="mt-10 text-center text-xs text-[#8a90a0]">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact Support</span>
        </div>
        <p className="mx-auto mt-5 max-w-[300px] leading-5">
          This is a secure area of the TeaOps Admin suite. Your IP address is being logged for security purposes.
        </p>
      </div>
    </div>
  );
}
