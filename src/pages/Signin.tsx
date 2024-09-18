import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/appwrite/Auth";


const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
});

export function Signin() {
  const {dispatch} = useAuth()
  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authService.Login(values.email,values.password)
    const userData = await authService.getAcc()
    if(userData){
      dispatch({type:"LOGIN",payload:{$id:userData.$id,name:userData.name,email:userData.email}})
      navigate('/')
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex flex-col justify-center items-center mt-20">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border p-6 w-2/6 rounded">
        <h1 className="text-center font-medium text-xl">LOGIN HERE</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address:" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password:" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <div>
        <span>Account not created <Link className="text-blue-400" to="/signup">CLICK HERE</Link> to Register.</span>
        </div>
      </form>
    </Form>
    </div>
  );
}
