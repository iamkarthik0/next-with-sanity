'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { submitUserForm } from '@/app/actions/submitUser'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
})

export function UserForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => formData.append(key, value))
    
    try {
      const result = await submitUserForm(formData)
      if (result.success) {
        router.push('/dashboard')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-4 font-mono p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormControl>
                  <Input 
                    placeholder="First" 
                    {...field} 
                    className="w-full font-mono border-black focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base" 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormControl>
                  <Input 
                    placeholder="Last" 
                    {...field} 
                    className="w-full font-mono border-black focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base" 
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input 
                  placeholder="Email" 
                  {...field} 
                  className="w-full font-mono border-black focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base" 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className=" w-full md:w-1/2 bg-black hover:bg-black/90 font-mono text-white text-sm sm:text-base py-2 sm:py-3 tracking-widest" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                SUBMITTING...
              </>
            ) : ( 
              'INQUIRE'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
