import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  LogOut,
  ArrowLeft,
  Loader2,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface TourFormData {
  title_uz: string;
  title_ru: string;
  title_en: string;
  title_kaa: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  description_kaa: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  wifi: boolean;
  transport: string;
  start_date: string;
  end_date: string;
  cost: number;
  phone_number: string;
  messanger_id: string;
  max_seats: number;
  photos: string[];
}

const initialFormData: TourFormData = {
  title_uz: '',
  title_ru: '',
  title_en: '',
  title_kaa: '',
  description_uz: '',
  description_ru: '',
  description_en: '',
  description_kaa: '',
  breakfast: false,
  lunch: false,
  dinner: false,
  wifi: false,
  transport: '',
  start_date: '',
  end_date: '',
  cost: 0,
  phone_number: '',
  messanger_id: '',
  max_seats: 1,
  photos: [],
};

const AdminTourForm: React.FC = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { admin, logout, token } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<TourFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const { data: existingTour } = useQuery({
    queryKey: ['tour', id],
    queryFn: () => api.getTourById(id!),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingTour) {
      setFormData({
        title_uz: existingTour.title_uz,
        title_ru: existingTour.title_ru,
        title_en: existingTour.title_en,
        title_kaa: existingTour.title_kaa,
        description_uz: existingTour.description_uz,
        description_ru: existingTour.description_ru,
        description_en: existingTour.description_en,
        description_kaa: existingTour.description_kaa,
        breakfast: existingTour.breakfast,
        lunch: existingTour.lunch,
        dinner: existingTour.dinner,
        wifi: existingTour.wifi,
        transport: existingTour.transport,
        start_date: existingTour.start_date.split('T')[0],
        end_date: existingTour.end_date.split('T')[0],
        cost: existingTour.cost,
        phone_number: existingTour.phone_number,
        messanger_id: existingTour.messanger_id,
        max_seats: existingTour.max_seats,
        photos: existingTour.photos?.map(p => p.url) || [],
      });
    }
  }, [existingTour]);

  const handleChange = (field: keyof TourFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPhoto = () => {
    if (newPhotoUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, newPhotoUrl.trim()],
      }));
      setNewPhotoUrl('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing 
        ? `http://localhost:9000/turs/${id}`
        : 'http://localhost:9000/turs';
      
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          start_date: new Date(formData.start_date).toISOString(),
          end_date: new Date(formData.end_date).toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to save tour');

      toast({
        title: isEditing ? 'Tour updated' : 'Tour created',
        description: isEditing 
          ? 'The tour has been successfully updated.'
          : 'The tour has been successfully created.',
      });

      navigate('/admin/tours');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save tour. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
          >
            <Map className="h-5 w-5" />
            Tours
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
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
          <Link to="/admin/tours">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold">
              {isEditing ? 'Edit Tour' : 'Create New Tour'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update tour details' : 'Fill in the details to create a new tour'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Titles */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Tour Titles</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="en">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="en">EN</TabsTrigger>
                    <TabsTrigger value="ru">RU</TabsTrigger>
                    <TabsTrigger value="uz">UZ</TabsTrigger>
                    <TabsTrigger value="kaa">KAA</TabsTrigger>
                  </TabsList>
                  <TabsContent value="en" className="space-y-4">
                    <div>
                      <Label>Title (English)</Label>
                      <Input
                        value={formData.title_en}
                        onChange={(e) => handleChange('title_en', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Description (English)</Label>
                      <Textarea
                        value={formData.description_en}
                        onChange={(e) => handleChange('description_en', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="ru" className="space-y-4">
                    <div>
                      <Label>Title (Russian)</Label>
                      <Input
                        value={formData.title_ru}
                        onChange={(e) => handleChange('title_ru', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Description (Russian)</Label>
                      <Textarea
                        value={formData.description_ru}
                        onChange={(e) => handleChange('description_ru', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="uz" className="space-y-4">
                    <div>
                      <Label>Title (Uzbek)</Label>
                      <Input
                        value={formData.title_uz}
                        onChange={(e) => handleChange('title_uz', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Description (Uzbek)</Label>
                      <Textarea
                        value={formData.description_uz}
                        onChange={(e) => handleChange('description_uz', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="kaa" className="space-y-4">
                    <div>
                      <Label>Title (Karakalpak)</Label>
                      <Input
                        value={formData.title_kaa}
                        onChange={(e) => handleChange('title_kaa', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Description (Karakalpak)</Label>
                      <Textarea
                        value={formData.description_kaa}
                        onChange={(e) => handleChange('description_kaa', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Tour Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => handleChange('start_date', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => handleChange('end_date', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cost ($)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.cost}
                      onChange={(e) => handleChange('cost', parseFloat(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Max Seats</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.max_seats}
                      onChange={(e) => handleChange('max_seats', parseInt(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Transport</Label>
                  <Input
                    value={formData.transport}
                    onChange={(e) => handleChange('transport', e.target.value)}
                    placeholder="e.g., Bus, Train, Plane"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={formData.phone_number}
                      onChange={(e) => handleChange('phone_number', e.target.value)}
                      placeholder="+998..."
                      required
                    />
                  </div>
                  <div>
                    <Label>Messenger ID</Label>
                    <Input
                      value={formData.messanger_id}
                      onChange={(e) => handleChange('messanger_id', e.target.value)}
                      placeholder="Telegram/WhatsApp"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="breakfast"
                      checked={formData.breakfast}
                      onCheckedChange={(checked) => handleChange('breakfast', checked)}
                    />
                    <Label htmlFor="breakfast">Breakfast Included</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lunch"
                      checked={formData.lunch}
                      onCheckedChange={(checked) => handleChange('lunch', checked)}
                    />
                    <Label htmlFor="lunch">Lunch Included</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dinner"
                      checked={formData.dinner}
                      onCheckedChange={(checked) => handleChange('dinner', checked)}
                    />
                    <Label htmlFor="dinner">Dinner Included</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi"
                      checked={formData.wifi}
                      onCheckedChange={(checked) => handleChange('wifi', checked)}
                    />
                    <Label htmlFor="wifi">WiFi Available</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="Enter photo URL"
                  />
                  <Button type="button" onClick={addPhoto} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {formData.photos.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link to="/admin/tours">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="btn-gradient" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                'Update Tour'
              ) : (
                'Create Tour'
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminTourForm;
