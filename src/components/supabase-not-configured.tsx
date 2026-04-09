import { IconAlertCircle, IconExternalLink } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SupabaseNotConfigured() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <IconAlertCircle className="size-5 text-amber-600" />
            </div>
            <CardTitle className="text-base">Supabase Not Configured</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            This page requires a live Supabase connection. Connect your project to manage content.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#d67653] text-white text-xs font-bold shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-medium text-foreground">Create a Supabase project</p>
                <p className="text-xs mt-0.5">
                  Go to{" "}
                  <a href="https://supabase.com" target="_blank" className="underline text-[#d67653]">
                    supabase.com
                  </a>{" "}
                  and create a new project.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#d67653] text-white text-xs font-bold shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-medium text-foreground">Run the SQL schema</p>
                <p className="text-xs mt-0.5">
                  Copy{" "}
                  <code className="bg-muted px-1 rounded text-xs">supabase/schema.sql</code>{" "}
                  and run it in your Supabase SQL editor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#d67653] text-white text-xs font-bold shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-medium text-foreground">Add environment variables</p>
                <p className="text-xs mt-0.5">
                  Add your credentials to{" "}
                  <code className="bg-muted px-1 rounded text-xs">.env.local</code>:
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-lg text-xs font-mono overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`}
                </pre>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#d67653] text-white text-xs font-bold shrink-0 mt-0.5">4</span>
              <div>
                <p className="font-medium text-foreground">Restart the dev server</p>
                <p className="text-xs mt-0.5">Run <code className="bg-muted px-1 rounded text-xs">npm run dev</code> again after adding env vars.</p>
              </div>
            </div>
          </div>

          <Button asChild size="sm" variant="outline" className="w-full">
            <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">
              <IconExternalLink className="size-3.5 mr-2" />
              Supabase Documentation
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
