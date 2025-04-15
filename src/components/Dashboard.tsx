import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Track key metrics, view performance insights, and stay updated on your progress.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="brawl-card">
          <CardHeader>
            <CardTitle>Matches Played</CardTitle>
            <CardDescription>Total matches played</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-muted-foreground">
              <span className="text-green-500">+25%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="brawl-card">
          <CardHeader>
            <CardTitle>Win Rate</CardTitle>
            <CardDescription>Percentage of matches won</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-muted-foreground">
              <span className="text-red-500">-5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="brawl-card">
          <CardHeader>
            <CardTitle>Average Trophies</CardTitle>
            <CardDescription>Average trophies earned per match</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5</div>
            <p className="text-muted-foreground">
              <span className="text-green-500">+10%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="brawl-card">
          <CardHeader>
            <CardTitle>Star Player Rate</CardTitle>
            <CardDescription>Percentage of matches as Star Player</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-muted-foreground">
              <span className="text-green-500">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
