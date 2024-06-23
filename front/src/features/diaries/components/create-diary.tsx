import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import type { CreateDiaryInput } from '@/features/diaries/api'
import { createDiaryInputSchema, useCreateDiary } from '@/features/diaries/api'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
type CreateDiaryProps = {
  userId: number
}

export const CreateDiary = ({ userId }: CreateDiaryProps) => {
  const createDiaryMutation = useCreateDiary({
    userId,
    mutationConfig: {
      onSuccess: () => {
        console.log('success')
        // TODO: トースト出現させる
      },
    },
  })

  const form = useForm<CreateDiaryInput>({
    resolver: zodResolver(createDiaryInputSchema),
    defaultValues: {
      userId,
      body: '',
    },
  })

  const onSubmit: SubmitHandler<CreateDiaryInput> = (values) => {
    createDiaryMutation.mutate({
      userId: values.userId,
      body: values.body,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="body"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>日記</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        )}
      />
      <Button type="submit">登録する</Button>
    </form>
  )
}
