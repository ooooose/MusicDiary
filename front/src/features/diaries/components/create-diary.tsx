'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import type { CreateDiaryInput } from '@/features/diaries/api'
import { createDiaryInputSchema, useCreateDiary } from '@/features/diaries/api'
import { formatDateForDairyDiaries, formatToday } from '@/lib/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

export const CreateDiary = () => {
  const today = formatToday()
  const router = useRouter()
  const createDiaryMutation = useCreateDiary({
    mutationConfig: {
      onSuccess: async () => {
        // toastを出すこと
        router.push(`/diaries/${formatDateForDairyDiaries(new Date())}`)
      },
      onError: (error) => {
        console.log('error', error)
      },
    },
  })

  const form = useForm<CreateDiaryInput>({
    resolver: zodResolver(createDiaryInputSchema),
    defaultValues: {
      body: '',
    },
  })

  const onSubmit: SubmitHandler<CreateDiaryInput> = (values) => {
    createDiaryMutation.mutate({
      body: values.body,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="body"
          render={({ field, fieldState }) => (
            <FormItem>
              {today}
              <FormControl>
                <Textarea {...field} className="h-[300px]" />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="float-right mt-4" type="submit" variant="outline">
          登録する
        </Button>
      </form>
    </Form>
  )
}
