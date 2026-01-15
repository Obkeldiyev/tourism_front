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
  X,
  Upload,
  Image as ImageIcon,
  Trash2
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

interface AdditionalInfo {
  info_title_uz: string;
  info_title_ru: string;
  info_title_en: string;
  info_title_kaa: string;
  info_description_uz: string;
  info_description_ru: string;
  info_description_en: string;
  info_description_kaa: string;
}

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
  additional_info: AdditionalInfo[];
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
  additional_info: [],
};

const initialAdditionalInfo: AdditionalInfo = {
  info_title_uz: '',
  info_title_ru: '',
  info_title_en: '',
  info_title_kaa: '',
  info_description_uz: '',
  info_description_ru: '',
  info_description_en: '',
  info_description_kaa: '',
};

const AdminTourForm: React.FC = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { admin, logout, token } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState<TourFormData>(initialFormData);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: existingTour, isLoading } = useQuery({
    queryKey: ['tour', id],
    queryFn: () => api.getTourById(id!),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingTour && isEditing) {
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
        additional_info: existingTour.additional_info || [],
      });
    }
  }, [existingTour, isEditing]);

  const handleChange = (field: keyof TourFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 15) {
      toast({
        title: 'Too many files',
        description: 'You can upload maximum 15 photos',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFiles(files);
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const addAdditionalInfo = () => {
    setFormData(prev => ({
      ...prev,
      additional_info: [...prev.additional_info, { ...initialAdditionalInfo }],
    }));
  };

  const removeAdditionalInfo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additional_info: prev.additional_info.filter((_, i) => i !== index),
    }));
  };

  const updateAdditionalInfo = (index: number, field: keyof AdditionalInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      additional_info: prev.additional_info.map((info, i) => 
        i === index ? { ...info, [field]: value } : info
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = [
      'title_uz', 'title_ru', 'title_en', 'title_kaa',
      'description_uz', 'description_ru', 'description_en', 'description_kaa',
      'transport', 'start_date', 'end_date'
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof TourFormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: 'Missing Required Fields',
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Add all required form fields
      formDataToSend.append('title_uz', formData.title_uz);
      formDataToSend.append('title_ru', formData.title_ru);
      formDataToSend.append('title_en', formData.title_en);
      formDataToSend.append('title_kaa', formData.title_kaa);
      formDataToSend.append('description_uz', formData.description_uz);
      formDataToSend.append('description_ru', formData.description_ru);
      formDataToSend.append('description_en', formData.description_en);
      formDataToSend.append('description_kaa', formData.description_kaa);
      formDataToSend.append('breakfast', formData.breakfast.toString());
      formDataToSend.append('lunch', formData.lunch.toString());
      formDataToSend.append('dinner', formData.dinner.toString());
      formDataToSend.append('wifi', formData.wifi.toString());
      formDataToSend.append('transport', formData.transport);
      formDataToSend.append('start_date', formData.start_date);
      formDataToSend.append('end_date', formData.end_date);
      formDataToSend.append('cost', formData.cost.toString());
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('messanger_id', formData.messanger_id);
      formDataToSend.append('max_seats', formData.max_seats.toString());

      // Add additional_info as JSON string if it exists
      if (formData.additional_info.length > 0) {
        formDataToSend.append('additional_info', JSON.stringify(formData.additional_info));
      }

      // Add files with the correct field name 'files'
      selectedFiles.forEach(file => {
        formDataToSend.append('files', file);
      });

      // Use centralized API service
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      console.log('Submitting tour with files:', selectedFiles.length);
      console.log('Form data:', formData);

      const result = isEditing 
        ? await api.updateTour(id!, formDataToSend, token)
        : await api.createTour(formDataToSend, token);

      console.log('Tour submission result:', result);

      toast({
        title: isEditing ? 'Tour updated' : 'Tour created',
        description: isEditing 
          ? 'The tour has been successfully updated.'
          : 'The tour has been successfully created.',
      });

      navigate('/admin/tours');
    } catch (error: any) {
      console.error('Tour submission error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save tour. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <div className="space-y-6">
            {/* Titles and Descriptions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Tour Information</CardTitle>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tour Details */}
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
                        value={formData.cost || ''}
                        onChange={(e) => handleChange('cost', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Max Seats</Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.max_seats || ''}
                        onChange={(e) => handleChange('max_seats', parseInt(e.target.value) || 1)}
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
                        placeholder="+998 61 223 45 67"
                      />
                    </div>
                    <div>
                      <Label>Messenger ID</Label>
                      <Input
                        value={formData.messanger_id}
                        onChange={(e) => handleChange('messanger_id', e.target.value)}
                        placeholder="Telegram/WhatsApp"
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
            </div>

            {/* Photo Upload */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Photos (Max 15)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="photos">Upload Photos</Label>
                  <Input
                    id="photos"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Select up to 15 images (JPG, PNG, WebP)
                  </p>
                </div>
                
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Additional Information</CardTitle>
                <Button type="button" onClick={addAdditionalInfo} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Info
                </Button>
              </CardHeader>
              <CardContent>
                {formData.additional_info.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No additional information added yet. Click "Add Info" to add some.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {formData.additional_info.map((info, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <button
                          type="button"
                          onClick={() => removeAdditionalInfo(index)}
                          className="absolute top-2 right-2 p-1 text-destructive hover:bg-destructive/10 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <Tabs defaultValue="en">
                          <TabsList className="grid grid-cols-4 mb-4">
                            <TabsTrigger value="en">EN</TabsTrigger>
                            <TabsTrigger value="ru">RU</TabsTrigger>
                            <TabsTrigger value="uz">UZ</TabsTrigger>
                            <TabsTrigger value="kaa">KAA</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="en" className="space-y-3">
                            <div>
                              <Label>Title (English)</Label>
                              <Input
                                value={info.info_title_en}
                                onChange={(e) => updateAdditionalInfo(index, 'info_title_en', e.target.value)}
                                placeholder="Information title"
                              />
                            </div>
                            <div>
                              <Label>Description (English)</Label>
                              <Textarea
                                value={info.info_description_en}
                                onChange={(e) => updateAdditionalInfo(index, 'info_description_en', e.target.value)}
                                placeholder="Information description"
                                rows={3}
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="ru" className="space-y-3">
                            <div>
                              <Label>Title (Russian)</Label>
                              <Input
                                value={info.info_title_ru}
                                onChange={(e) => updateAdditionalInfo(index, 'info_title_ru', e.target.value)}
                                placeholder="Заголовок информации"
                              />
                            </div>
                            <div>
                              <Label>Description (Russian)</Label>
                              <Textarea
                                value={info.info_description_ru}
                                onChange={(e) => updateAdditionalInfo(index, 'info_description_ru', e.target.value)}
                                placeholder="Описание информации"
                                rows={3}
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="uz" className="space-y-3">
                            <div>
                              <Label>Title (Uzbek)</Label>
                              <Input
                                value={info.info_title_uz}
                                onChange={(e) => updateAdditionalInfo(index, 'info_title_uz', e.target.value)}
                                placeholder="Ma'lumot sarlavhasi"
                              />
                            </div>
                            <div>
                              <Label>Description (Uzbek)</Label>
                              <Textarea
                                value={info.info_description_uz}
                                onChange={(e) => updateAdditionalInfo(index, 'info_description_uz', e.target.value)}
                                placeholder="Ma'lumot tavsifi"
                                rows={3}
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="kaa" className="space-y-3">
                            <div>
                              <Label>Title (Karakalpak)</Label>
                              <Input
                                value={info.info_title_kaa}
                                onChange={(e) => updateAdditionalInfo(index, 'info_title_kaa', e.target.value)}
                                placeholder="Maǵlıwmat sarlavhası"
                              />
                            </div>
                            <div>
                              <Label>Description (Karakalpak)</Label>
                              <Textarea
                                value={info.info_description_kaa}
                                onChange={(e) => updateAdditionalInfo(index, 'info_description_kaa', e.target.value)}
                                placeholder="Maǵlıwmat sıpatlaması"
                                rows={3}
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end gap-4">
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