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
import React, { memo } from 'react'
import type {
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

type EditDiaryProps = {
  form: UseFormReturn<UpdateDiaryInput>
  onSubmit: SubmitHandler<UpdateDiaryInput>
}

const TextareaField = memo(
  ({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
    <Textarea {...field} className="h-[300px]" />
  ),
)
TextareaField.displayName = 'TextareaField'

export const EditDiary = memo(({ form, onSubmit }: EditDiaryProps) => {

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
})

EditDiary.displayName = 'EditDiary'
