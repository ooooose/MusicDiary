'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import type { UpdateDiaryInput } from '@/features/diaries/api/update-diary'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

type EditDiaryProps = {
  form: UseFormReturn<{
    body: string
  }>
  onSubmit: SubmitHandler<UpdateDiaryInput>
}

export const EditDiary = ({ form, onSubmit }: EditDiaryProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="body"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} className="h-[300px]" />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
