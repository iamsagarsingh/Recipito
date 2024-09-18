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
import { authService } from "@/appwrite/Auth";
import { useAuth } from "@/context/AuthContext";



const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
  confirmPassword: z.string().min(6,{
    message: "Password should be at least 6 characters"
  }),
  fullname: z.string(),
});

export function Signup() {
  const {dispatch} = useAuth()
  const navigate = useNavigate()

  function onSubmit(values: z.infer<typeof formSchema>) {
    if(values.confirmPassword != values.password){
      alert("Values don't match!")
      return
    }
    authService.Signup(values.fullname,values.email,values.password).then(userData=>{
      if(userData){
        dispatch({type:"LOGIN",payload:{$id:userData.$id,name:userData.name,email:userData.email}})
        navigate('/')
      }
      
    })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex flex-col justify-center items-center mt-10" >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 border p-6 w-2/6 rounded">
        <h1 className="text-center font-medium text-xl">REGISTER HERE</h1>
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
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name:</FormLabel>
              <FormControl>
                <Input placeholder="Enter your FullName:" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password:</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password again:" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <div>
           <span> Already have an account <Link className="text-blue-400" to="/signin">CLICK HERE</Link> to login.</span>
        </div>
      </form>
    </Form>
    </div>
  );
}
