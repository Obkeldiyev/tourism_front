import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  LogOut,
  ArrowLeft,
  Calendar,
  Phone,
  User,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Booking {
  id: string;
  tur_id: string;
  full_name: string;
  phone_number: string;
  seats_booked: number;
  status: string;
  booking_date: string;
}

const AdminBookings: React.FC = () => {
  const { admin, logout, token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => api.getAllBookings(token || ''),
    enabled: !!token,
  });

  const deleteBookingMutation = useMutation({
    mutationFn: (id: string) => api.deleteBooking(id, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: 'Booking deleted',
        description: 'The booking has been moved to history.',
      });
      setIsDeleteDialogOpen(false);
      setBookingToDelete(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete booking',
        variant: 'destructive',
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'booked':
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'booked':
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  const handleDeleteBooking = (id: string) => {
    setBookingToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      deleteBookingMutation.mutate(bookingToDelete);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">{admin?.username}</p>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/tours"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Map className="h-5 w-5" />
            Tours
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
          >
            <Users className="h-5 w-5" />
            Bookings
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold">Bookings</h1>
            <p className="text-muted-foreground">View and manage all tour bookings</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bookings.filter(b => b.status?.toLowerCase() === 'booked' || b.status?.toLowerCase() === 'active').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {bookings.filter(b => b.status?.toLowerCase() === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Seats</p>
                  <p className="text-2xl font-bold">
                    {bookings.reduce((sum, booking) => sum + (booking.seats_booked || 0), 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>All Bookings ({bookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No bookings yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking: Booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{booking.full_name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {booking.phone_number}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </span>
                          <span>{booking.seats_booked} seat(s)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(booking.status || 'pending')}>
                        {getStatusIcon(booking.status || 'pending')}
                        <span className="ml-1">{booking.status || 'pending'}</span>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(booking)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Booking Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="font-medium">{selectedBooking.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="font-medium">{selectedBooking.phone_number}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Seats Booked</label>
                  <p className="font-medium">{selectedBooking.seats_booked}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(selectedBooking.status || 'pending')}>
                    {getStatusIcon(selectedBooking.status || 'pending')}
                    <span className="ml-1">{selectedBooking.status || 'pending'}</span>
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Booking Date</label>
                <p className="font-medium">{new Date(selectedBooking.booking_date).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tour ID</label>
                <p className="font-medium font-mono text-sm">{selectedBooking.tur_id}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this booking? This action will move the booking to history and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBookings;
