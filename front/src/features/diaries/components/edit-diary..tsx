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
import {
  updateDiaryInputSchema,
  useUpdateDiary,
} from '@/features/diaries/api/update-diary'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type EditDiaryProps = {
  diaryId: string
}

export const EditDiary = ({ diaryId }: EditDiaryProps) => {
  const createDiaryMutation = useUpdateDiary({
    mutationConfig: {
      onSuccess: async () => {
        // toastを出すこと
        console.log('success')
      },
      onError: (error) => {
        console.log('error', error)
      },
    },
  })

  const form = useForm<UpdateDiaryInput>({
    resolver: zodResolver(updateDiaryInputSchema),
    defaultValues: {
      body: '',
    },
  })

  const onSubmit: SubmitHandler<UpdateDiaryInput> = (values) => {
    createDiaryMutation.mutate({
      diaryId,
      data: { body: values.body },
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
