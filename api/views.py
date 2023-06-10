from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        }
    ]
    return Response(routes)

@api_view(['GET','POST'])
def get_notes(request):
    if request.method == 'GET':
        notes = Note.objects.all().order_by('-updated_at')
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    if request.method== 'POST':
        data=request.data
        note=Note.objects.create(
            body=data['body'] if 'body' in data else '',
            title=data['title'] if 'title' in data else ''
        )
        serializer=NoteSerializer(note,many=False)
        return Response(serializer.data)

@api_view(['GET','DELETE','PUT'])
def get_note(request,pk):
    if request.method=='GET':
        note=Note.objects.get(pk=pk)
        serializer=NoteSerializer(note,many=False)
        return Response(serializer.data)
    if request.method=='PUT':
        data=request.data
        note=Note.objects.get(pk=pk)
        serializer=NoteSerializer(instance=note,data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    if request.method=='DELETE':
        note=Note.objects.get(pk=pk)
        note.delete()
        return Response('Note was deleted!')


# @api_view(['PUT'])
# def update_note(request,pk):
#     data=request.data
#     note=Note.objects.get(pk=pk)
#     serializer=NoteSerializer(instance=note,data=data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def delete_note(request,pk):
#     note=Note.objects.get(pk=pk)
#     note.delete()
#     return Response('Note was deleted!')

# @api_view(['POST'])
# def create_note(request):
#     data=request.data
#     note=Note.objects.create(
#         body=data['body'] if 'body' in data else '',
#         title=data['title'] if 'title' in data else ''
#     )
#     serializer=NoteSerializer(note,many=False)
#     return Response(serializer.data)