"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, Building2, Calendar } from "lucide-react"

interface DashboardStats {
  totalBatches: number
  totalBranches: number
  totalSections: number
  totalStudents: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBatches: 0,
    totalBranches: 0,
    totalSections: 0,
    totalStudents: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading stats - you can implement actual API calls here
    setTimeout(() => {
      setStats({
        totalBatches: 5,
        totalBranches: 12,
        totalSections: 48,
        totalStudents: 1250,
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const statCards = [
    {
      title: "Total Batches",
      value: stats.totalBatches,
      description: "Active academic batches",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Total Branches",
      value: stats.totalBranches,
      description: "Engineering branches",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Total Sections",
      value: stats.totalSections,
      description: "Class sections",
      icon: Building2,
      color: "text-purple-600",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      description: "Enrolled students",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className={cn("h-4 w-4", card.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : card.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/admin/batches">
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Batches
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/admin/branches">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Manage Branches
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/admin/sections">
                  <Building2 className="mr-2 h-4 w-4" />
                  Manage Sections
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/admin/students">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Students
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New batch created</p>
                  <p className="text-xs text-gray-500">2024-2028 batch added</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Students enrolled</p>
                  <p className="text-xs text-gray-500">45 new students in CSE</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Attendance marked</p>
                  <p className="text-xs text-gray-500">Today's attendance completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
